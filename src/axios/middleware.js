import { NextResponse } from "next/server"
import acceptLanguage from "accept-language"
import fetch from "isomorphic-unfetch"
import jwt_decode from "jwt-decode"

import { fallbackLng, languages } from "./app/i18n/settings"
import { authRoutes, protectedRoutes } from "./app/routes"
import { BACKEND_URL } from "./server"
import { appUrlToPolicyNameMap } from "./app/appUrlToPolicyNameMap"

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}

const cookieName = "i18next"

export async function middleware(req) {
  const csp =
    `media-src 'self' https://*.gleap.io https://cdn.accelerate.unic.ac.cy https://cdn-stg.accelerate.unic.ac.cy;
  frame-src 'self' https://*.gleap.io https://messenger-app.gleap.io https://api.gleap.io;
  default-src 'self' http://localhost:3000 https://cdn.accelerate.unic.ac.cy https://cdn-stg.accelerate.unic.ac.cy https://api.accelerate.unic.ac.cy https://stg-api.accelerate.unic.ac.cy https://api.gleap.io https://*.gleap.io https://cdn.lr-intake.com/;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com/ https://browser-intake-datadoghq.eu/ https://www.datadoghq-browser-agent.com https://*.gleap.io https://cdn.lr-intake.com/ https://cdn.accelerate.unic.ac.cy https://cdn-stg.accelerate.unic.ac.cy https://stg-api.accelerate.unic.ac.cy https://cloudflare-eth.com/ https://explorer-api.walletconnect.com/;
  connect-src 'self' https://cdn.accelerate.unic.ac.cy https://cdn-stg.accelerate.unic.ac.cy https://browser-intake-datadoghq.eu/ https://*.s3.eu-central-1.amazonaws.com http://localhost:3000 https://*.gleap.io wss://ws.gleap.io https://api.gleap.io https://dashapi.gleap.io https://stg-api.accelerate.unic.ac.cy https://api.accelerate.unic.ac.cy https://jee16cr0z2.execute-api.eu-central-1.amazonaws.com wss://relay.walletconnect.com/ https://cloudflare-eth.com/ https://cdn.lr-intake.com/logger-1.min.j;
  img-src 'self' https://fonts.googleapis.com https://cdn.accelerate.unic.ac.cy https://cdn-stg.accelerate.unic.ac.cy https://*.gleap.io https:  blob: data:;
  style-src 'self' 'unsafe-inline';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';`
      .replace(/\s{2,}/g, " ")
      .trim()

  let resp = NextResponse.next()

  // If req.url does not contain a language prefix, redirect to the default language
  if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`))) {
    return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url))
  }

  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  ) {
    resp.headers.set("Content-Security-Policy", csp)

    if (req.nextUrl.pathname.startsWith("stg-api")) {
      resp.headers.append(
        "Access-Control-Allow-Origin",
        "https://stg-api.accelerate.unic.ac.cy"
      )
    } else if (req.nextUrl.pathname.startsWith("api")) {
      resp.headers.append(
        "Access-Control-Allow-Origin",
        "https://api.accelerate.unic.ac.cy"
      )
    } else {
      resp.headers.append(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
      )
    }

    return resp
  }

  let accessToken = req.cookies.get("accessToken")?.value
  let currentUser = accessToken ? JSON.stringify(jwt_decode(accessToken)) : null
  let refreshToken = req.cookies.get("refreshToken")?.value
  // let refreshTimes = req.cookies.get("refreshTimes")?.value || 0
  // Check if the token is about to expire

  if (currentUser && Date.now() / 1000 > JSON.parse(currentUser).exp - 60) {
    // 2 minutes before expiry
    // Call the refresh token API
    //const response = NextResponse.next()

    // accessToken = req.cookies.get("accessToken")?.value
    // currentUser = accessToken ? JSON.stringify(jwt_decode(accessToken)) : null
    // refreshToken = req.cookies.get("refreshToken")?.value
    // refreshTimes = req.cookies.get("refreshTimes")?.value
    try {
      let respo = await fetch(`${BACKEND_URL}rotateJwtTokens/`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      if (respo.error || respo.data?.error) {
        throw new Error(`HTTP error! status: ${respo.status}`)
      }
      const data = await respo.json()

      // Update the accessToken and refreshToken with the new ones from the response
      const newAccessToken = data.accessToken

      if (newAccessToken) {
        // Make the POST request to the specified endpoint
        const response = await fetch(
          `${BACKEND_URL}system/get-cloudfront-signed-cookie`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
            // Add any headers or data as needed
          }
        )

        if (response.error || response.data?.error) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        //Set the cookie domain according to the environment
        var cookieDomain = ""

        if (process.env.NEXT_PUBLIC_APP_ENV === "PROD") {
          cookieDomain = ".accelerate.unic.ac.cy"
        } else if (process.env.NEXT_PUBLIC_APP_ENV === "STG") {
          cookieDomain = ".stg.accelerate.unic.ac.cy"
        } else {
          cookieDomain = "local.accelerate.unic.ac.cy"
        }

        if (response.ok) {
          const cloudfrontCookieData = await response.json()
          for (const [name, value] of Object.entries(cloudfrontCookieData)) {
            resp.cookies.set(name, value, {
              domain: cookieDomain, //set the cookie domain .accelerate.unic.ac.cy or .stg.accelerate.unic.ac.cy
              secure: true, // Secured
              sameSite: "none",
            })
          }
        } //end inner if
      } //end if

      const newRefreshToken = data.refreshToken
      resp.cookies.set("accessToken", newAccessToken)
      resp.cookies.set("refreshToken", newRefreshToken)

      currentUser = JSON.stringify(jwt_decode(newAccessToken))
      return resp
    } catch (error) {
      console.error("Error refreshing token:", error)
      // const response = NextResponse.redirect(new URL(`/${lng}/signin`, req.url))
      const response = NextResponse.redirect(new URL(`/en/signin`, req.url))
      response.cookies.delete("accessToken")
      response.cookies.delete("refreshToken")
      return response
    }
  }
  const defaultLanguage = 'en'
  const hasLanguagePrefix = languages.some((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`)
  )
  const detectedLanguage = hasLanguagePrefix
    ? req.nextUrl.pathname.split("/")[1]
    : null

  const pathWithoutLanguagePrefix = req.nextUrl.pathname
    .split("/")
    .slice(2)
    .join("/")
  let lng = null
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"))
  if (!lng) lng = fallbackLng

  if (currentUser && pathWithoutLanguagePrefix === "signin") {
    const response = NextResponse.redirect(new URL(`/`, req.url))
    response.headers.set("Content-Security-Policy", csp)
    return response
  }

  if (
    (protectedRoutes.includes(pathWithoutLanguagePrefix) ||
      pathWithoutLanguagePrefix.startsWith("powerflow/") ||
      pathWithoutLanguagePrefix.startsWith("system-app/") ||
      pathWithoutLanguagePrefix.startsWith("myfiles/")) &&
    (!currentUser || Date.now() / 1000 > JSON.parse(currentUser).exp)
  ) {
    req.cookies.delete("accessToken")
    const response = NextResponse.redirect(new URL(`/${lng}/signin`, req.url))
    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")
    response.headers.set("Content-Security-Policy", csp)
    return response
  }

  if (authRoutes.includes(pathWithoutLanguagePrefix) && currentUser) {
    const response = NextResponse.redirect(new URL(`/`, req.url))
    response.headers.set("Content-Security-Policy", csp)
    return response
  }
  // Redirect if lng in path is not supported
  if (!hasLanguagePrefix && !req.nextUrl.pathname.startsWith("/_next")) {
  
  return NextResponse.rewrite(
    new URL(`/${defaultLanguage}${req.nextUrl.pathname}`, req.url)
  );
}
  // Check authorization of an app
  const appName = pathWithoutLanguagePrefix.split("/")[0]
  if (Object.keys(appUrlToPolicyNameMap).includes(appName)) {
    const response = await fetch(`${BACKEND_URL}system/check-authorization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        appName: appUrlToPolicyNameMap[appName],
        actions: ["view"],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.view) {
      // Create a URL object from the request URL
      const urlObj = new URL(req.url);

      // Extract the base URL (protocol + host)
      const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

      const lngFromUrl = urlObj.pathname.split("/")[1];
      
      // Construct the unauthorized URL path
      const unauthorizedUrl = `/${lngFromUrl}/403`;

      // Create a new URL using the base URL and the unauthorized URL path
      const redirectUrl = new URL(unauthorizedUrl, baseUrl);

      return NextResponse.redirect(redirectUrl);
    }
  }

 
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"))
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    )
    const response = NextResponse.next()

    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  resp.headers.set("Content-Security-Policy", csp)
  return resp
}

import { NextRequest, NextResponse } from 'next/server'
import { Svix } from 'svix'

export async function POST(request: NextRequest) {
  try {
    const { appId, darkMode, primaryColorLight, primaryColorDark } = await request.json()

    if (!appId) {
      return NextResponse.json(
        { error: 'Missing app ID' },
        { status: 400 }
      )
    }

    const svix = new Svix(process.env.SVIX_AUTH_TOKEN!)

    // Generate app portal URL
    const appPortal = await svix.authentication.appPortalAccess(appId, {})

    // Add theme parameters to the URL if provided
    let finalUrl = appPortal.url
    if (darkMode !== undefined || primaryColorLight || primaryColorDark) {
      const url = new URL(finalUrl)
      
      if (darkMode !== undefined) {
        url.searchParams.set('darkMode', darkMode.toString())
      }
      
      if (primaryColorLight) {
        url.searchParams.set('primaryColorLight', primaryColorLight)
      }
      
      if (primaryColorDark) {
        url.searchParams.set('primaryColorDark', primaryColorDark)
      }
      
      finalUrl = url.toString()
    }

    return NextResponse.json({ url: finalUrl })
  } catch (error) {
    console.error('Error generating app portal URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate app portal URL' },
      { status: 500 }
    )
  }
}
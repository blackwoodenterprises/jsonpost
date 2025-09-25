import { NextRequest, NextResponse } from 'next/server'
import { Svix } from 'svix'

export async function POST(request: NextRequest) {
  try {
    const { endpointId, endpointName } = await request.json()

    if (!endpointId || !endpointName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const svix = new Svix(process.env.SVIX_AUTH_TOKEN!)

    // Create a new application in Svix
    const app = await svix.application.create({
      name: `JSONPost - ${endpointName}`,
      uid: endpointId,
    })

    return NextResponse.json({ appId: app.id })
  } catch (error) {
    console.error('Error creating Svix application:', error)
    return NextResponse.json(
      { error: 'Failed to create Svix application' },
      { status: 500 }
    )
  }
}
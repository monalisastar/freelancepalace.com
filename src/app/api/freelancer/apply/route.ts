import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      country,
      timezone,
      category,
      linkedin, // ✅ required
      skillsDetails,
      motivation,
      portfolioLinks,
      certificationLinks,
    } = body

    if (
      !name || !email || !phone || !country || !timezone || !category || !linkedin ||
      !skillsDetails || !motivation || !portfolioLinks || !certificationLinks
    ) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const devBypassEmail = 'njatabrian648@gmail.com'

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (email === devBypassEmail) {
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name,
            email,
            role: 'freelancer',
            status: 'active',
          }
        })
      }

      return NextResponse.json({
        success: true,
        bypass: true,
        message: 'Dev bypass successful. Freelancer account created.'
      })
    }

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name,
          email,
          role: 'freelancer',
          status: 'pending',
        }
      })
    }

    await prisma.freelancerApplication.create({
      data: {
        name,
        email,
        phone,
        country,
        timezone,
        category,
        linkedin, // ✅ now included
        skillsDetails,
        motivation,
        portfolioLinks,
        certificationLinks,
        status: 'pending',
        aiSuspicionScore: 0
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted for review.'
    })
  } catch (err) {
    console.error('[APPLY_POST_ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


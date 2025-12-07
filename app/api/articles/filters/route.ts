import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Client from '@/lib/models/Client';
import ProjectType from '@/lib/models/ProjectType';

export async function GET() {
  try {
    await connectDB();

    // Get active clients and project types for filter dropdowns
    const [clients, projectTypes] = await Promise.all([
      Client.find({ isActive: true })
        .select('name slug logo')
        .sort({ displayOrder: 1, name: 1 })
        .lean(),
      ProjectType.find({ isActive: true })
        .select('name slug description')
        .sort({ displayOrder: 1, name: 1 })
        .lean(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          clients,
          projectTypes,
          statuses: [
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'completed', label: 'Completed' },
          ],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch filter options',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


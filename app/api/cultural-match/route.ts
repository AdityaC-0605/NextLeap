import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: Request) {
  try {
    console.log('Received request');
    const { preferences, top_n } = await request.json();
    console.log('Request data:', { preferences, top_n });

    // Create a Python process
    const pythonScriptPath = path.join(process.cwd(), 'culturematch.py');
    console.log('Python script path:', pythonScriptPath);

    const pythonProcess = spawn('python', [
      pythonScriptPath,
      '--input',
      preferences,
      '--top_n',
      top_n.toString()
    ]);

    let outputData = '';
    let errorData = '';

    // Collect data from script
    pythonProcess.stdout.on('data', (data) => {
      console.log('Received stdout data:', data.toString());
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Received stderr data:', data.toString());
      errorData += data.toString();
    });

    // Handle process completion
    return new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        console.log('Python process closed with code:', code);
        if (code !== 0) {
          console.error(`Python process exited with code ${code}`);
          console.error('Error data:', errorData);
          resolve(NextResponse.json(
            { error: 'Failed to process cultural match request' },
            { status: 500 }
          ));
          return;
        }

        try {
          console.log('Parsing output data:', outputData);
          const recommendations = JSON.parse(outputData);
          console.log('Successfully parsed recommendations');
          resolve(NextResponse.json(recommendations));
        } catch (error) {
          console.error('Failed to parse Python output:', error);
          resolve(NextResponse.json(
            { error: 'Failed to parse cultural match results' },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    console.error('Error in cultural match API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
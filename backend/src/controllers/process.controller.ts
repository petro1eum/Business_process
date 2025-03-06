import { Request, Response } from 'express';
import { parseImageWithClaude } from '../services/claude.service';
import { transformToProcessData } from '../utils/transform.util';

/**
 * Parse a business process diagram image and return structured data
 */
export const parseBusinessProcess = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Get the uploaded image
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');

    // Send the image to Claude API for analysis
    const claudeResponse = await parseImageWithClaude(imageBase64);
    
    // Transform Claude's response into a structured format for visualization
    const processData = transformToProcessData(claudeResponse);

    return res.status(200).json(processData);
  } catch (error) {
    console.error('Error parsing business process:', error);
    return res.status(500).json({ 
      error: 'Failed to parse business process',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 
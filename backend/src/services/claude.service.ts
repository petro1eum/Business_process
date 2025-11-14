import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: Array<{
    type: string;
    text?: string;
    source?: {
      type: string;
      media_type: string;
      data: string;
    };
  }>;
}

interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

/**
 * Parse a business process diagram image using Claude 3.7 API
 * @param imageBase64 - Base64 encoded image data
 * @returns Parsed business process data from Claude
 */
export const parseImageWithClaude = async (imageBase64: string): Promise<any> => {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key is not configured');
  }

  try {
    // Prepare the message for Claude with the image
    const message: ClaudeMessage = {
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: imageBase64
          }
        },
        {
          type: 'text',
          text: `Please analyze this business process diagram and extract the following information:
          
1. All process steps/activities
2. Decision points and gateways (AND/OR/XOR)
3. Roles involved in the process
4. Systems used (SAP, Excel, etc.)
5. Connections between steps
6. Any conditions or rules

Format your response as a JSON object with the following structure:
{
  "nodes": [
    {
      "id": "unique_id",
      "type": "activity|gateway|event|role|system",
      "label": "Node label/name",
      "position": { "x": 0, "y": 0 },
      "style": { 
        "background": "#color", 
        "border": "border_style",
        "width": width_value
      },
      "properties": { 
        // Additional properties specific to this node
      }
    }
  ],
  "edges": [
    {
      "id": "unique_id",
      "source": "source_node_id",
      "target": "target_node_id",
      "label": "Connection label if any",
      "type": "default|special",
      "animated": true/false,
      "properties": {
        // Additional properties for this connection
      }
    }
  ]
}

Position the nodes in a logical flow that matches the diagram. Use x,y coordinates that would create a readable visualization.
`
        }
      ]
    };

    // Make the API request to Claude
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [message]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Extract and parse the JSON response from Claude
    const claudeResponse = response.data as ClaudeResponse;
    const textResponse = claudeResponse.content[0].text;
    
    // Extract JSON from the response
    const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) || 
                      textResponse.match(/```\n([\s\S]*?)\n```/) ||
                      textResponse.match(/{[\s\S]*?}/);
                      
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Claude response');
    }
    
    const jsonString = jsonMatch[0].startsWith('{') ? jsonMatch[0] : jsonMatch[1];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error(`Failed to process image with Claude: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 
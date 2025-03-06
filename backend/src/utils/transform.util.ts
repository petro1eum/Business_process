/**
 * Transform the raw Claude API response into a structured format
 * for visualization in the frontend
 * 
 * @param claudeResponse - The parsed JSON response from Claude API
 * @returns Structured process data for visualization
 */
export const transformToProcessData = (claudeResponse: any): any => {
  // If Claude already returned data in the expected format, return it directly
  if (claudeResponse.nodes && claudeResponse.edges) {
    // Ensure all nodes have required properties
    const nodes = claudeResponse.nodes.map((node: any) => ({
      id: node.id,
      type: node.type || 'default',
      label: node.label,
      position: node.position || { x: 0, y: 0 },
      style: node.style || {
        background: getNodeColor(node.type),
        border: '1px solid #ddd',
        width: 150
      },
      properties: node.properties || {}
    }));

    // Ensure all edges have required properties
    const edges = claudeResponse.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label || '',
      type: edge.type || 'default',
      animated: edge.animated || false,
      properties: edge.properties || {}
    }));

    return { nodes, edges };
  }

  // If Claude returned a different format, try to transform it
  // This is a fallback in case Claude doesn't follow the exact format
  try {
    // Extract nodes and edges from whatever format Claude returned
    const nodes: any[] = [];
    const edges: any[] = [];

    // Add any transformation logic here if needed
    // ...

    return { nodes, edges };
  } catch (error) {
    console.error('Error transforming Claude response:', error);
    throw new Error('Failed to transform Claude response to visualization format');
  }
};

/**
 * Get a color for a node based on its type
 * 
 * @param nodeType - The type of the node
 * @returns A color hex code
 */
const getNodeColor = (nodeType: string): string => {
  switch (nodeType) {
    case 'activity':
      return '#e1f5fe'; // Light blue
    case 'gateway':
      return '#fff9c4'; // Light yellow
    case 'event':
      return '#ffebee'; // Light red
    case 'role':
      return '#e8f5e9'; // Light green
    case 'system':
      return '#f3e5f5'; // Light purple
    default:
      return '#ffffff'; // White
  }
}; 
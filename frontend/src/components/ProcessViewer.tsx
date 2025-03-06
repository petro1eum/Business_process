import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { 
  Controls, 
  Background, 
  Node, 
  Edge,
  ConnectionLineType,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import './ProcessViewer.css';

interface ProcessViewerProps {
  processData: any;
}

const ProcessViewer: React.FC<ProcessViewerProps> = ({ processData }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!processData) {
      navigate('/');
      return;
    }

    // Transform processData into nodes and edges for ReactFlow
    const transformedNodes: Node[] = processData.nodes.map((node: any) => ({
      id: node.id,
      type: node.type || 'default',
      position: { x: node.position.x, y: node.position.y },
      data: { label: node.label },
      style: {
        background: node.style?.background || '#fff',
        border: node.style?.border || '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        width: node.style?.width || 150,
      }
    }));

    const transformedEdges: Edge[] = processData.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type || 'default',
      animated: edge.animated || false,
      label: edge.label,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: {
        strokeWidth: 2,
      }
    }));

    setNodes(transformedNodes);
    setEdges(transformedEdges);
  }, [processData, navigate]);

  const handleCompare = () => {
    navigate('/compare');
  };

  if (!processData) {
    return null;
  }

  return (
    <div className="process-viewer-container">
      <div className="process-viewer-header">
        <h2>Business Process Visualization</h2>
        <button className="compare-button" onClick={handleCompare}>
          Compare with Original
        </button>
      </div>
      <div className="process-viewer">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Controls />
          <Background color="#f8f8f8" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ProcessViewer; 
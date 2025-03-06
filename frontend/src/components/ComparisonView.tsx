import { useEffect } from 'react';
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
import './ComparisonView.css';

interface ComparisonViewProps {
  processData: any;
  originalImage: string | null;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ processData, originalImage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!processData || !originalImage) {
      navigate('/');
    }
  }, [processData, originalImage, navigate]);

  if (!processData || !originalImage) {
    return null;
  }

  // Transform processData into nodes and edges for ReactFlow
  const nodes: Node[] = processData.nodes.map((node: any) => ({
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

  const edges: Edge[] = processData.edges.map((edge: any) => ({
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

  const handleBack = () => {
    navigate('/view');
  };

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h2>Comparison View</h2>
        <button className="back-button" onClick={handleBack}>
          Back to Visualization
        </button>
      </div>
      
      <div className="comparison-content">
        <div className="original-image-container">
          <h3>Original Image</h3>
          <div className="original-image">
            <img src={originalImage} alt="Original business process" />
          </div>
        </div>
        
        <div className="parsed-visualization-container">
          <h3>Parsed Visualization</h3>
          <div className="parsed-visualization">
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
      </div>
    </div>
  );
};

export default ComparisonView; 
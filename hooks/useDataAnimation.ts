'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaDatabase, FaBrain, FaSearch } from 'react-icons/fa';
import { AICard, AISectionHeading } from '@/components/AIElements';
import { useScatterPlotData, useClusteredData, useTimeSeriesData, TimeSeriesDataPoint } from '@/hooks/useDataAnimation';

type MetricsState = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
};

// Extract this into a separate component to avoid hooks inside loops
type TimeSeriesCategoryProps = {
  category: string;
  points: TimeSeriesDataPoint[];
  categoryIndex: number;
};

const TimeSeriesCategory: React.FC<TimeSeriesCategoryProps> = ({ category, points, categoryIndex }) => {
  const color = categoryIndex === 0 ? '#3B82F6' : '#F472B6';
  
  const sortedPoints = useMemo(() => {
    return [...points].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [points]);
  
  // Prepare paths
  const path = useMemo(() => {
    let pathString = '';
    sortedPoints.forEach((point, i) => {
      const x = (i / (sortedPoints.length - 1)) * 100;
      const y = 100 - (point.value / 100) * 100;
      if (i === 0) {
        pathString += `M ${x} ${y} `;
      } else {
        pathString += `L ${x} ${y} `;
      }
    });
    return pathString;
  }, [sortedPoints]);
  
  return (
    <React.Fragment>
      {/* Line */}
      <motion.svg 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: categoryIndex * 0.5 }}
      >
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: categoryIndex * 0.5 }}
        />
      </motion.svg>
      
      {/* Data points */}
      {sortedPoints.map((point, i) => {
        const x = (i / (sortedPoints.length - 1)) * 100;
        const y = 100 - (point.value / 100) * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
          />
        );
      })}
      
      {/* Legend item */}
      <div 
        className="absolute flex items-center"
        style={{ 
          right: categoryIndex === 0 ? '120px' : '10px',
          top: '10px'
        }}
      >
        <div 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-300">{category}</span>
      </div>
    </React.Fragment>
  );
};

// Extract cluster centers component
type ClusterCentersProps = {
  clusterData: ReturnType<typeof useClusteredData>;
};

const ClusterCenters: React.FC<ClusterCentersProps> = ({ clusterData }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => {
        const clusterPoints = clusterData.filter(p => p.category === i);
        if (clusterPoints.length === 0) return null;
        
        // Calculate cluster center
        const centerX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const centerY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        
        // Different colors for each cluster
        const colors = ['#3B82F6', '#8B5CF6', '#F472B6'];
        const color = colors[i % colors.length];
        
        return (
          <React.Fragment key={`cluster-${i}`}>
            {/* Cluster highlight area */}
            <motion.div
              className="absolute rounded-full mix-blend-lighten"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
                backgroundColor: `${color}20`,
                border: `1px solid ${color}40`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: '40%', 
                height: '40%',
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
            
            {/* Cluster center */}
            <motion.div
              className="absolute z-10 rounded-full"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
                backgroundColor: color,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ 
                width: '12px', 
                height: '12px',
                boxShadow: [
                  `0 0 0px ${color}80`,
                  `0 0 15px ${color}80`,
                  `0 0 0px ${color}80`
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const DataDashboardSection: React.FC = () => {
  // Generate data for visualizations
  const scatterData = useScatterPlotData(50, 3, 8000);
  const clusterData = useClusteredData(3, 20);
  const timeSeriesData = useTimeSeriesData(14, ['Model Accuracy', 'Training Loss']);

  // Accuracy metrics for AI models (simulated)
  const [metrics, setMetrics] = useState<MetricsState>({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0
  });

  // Format percentage numbers - memoized to prevent rerendering
  const formatPercent = useMemo(() => {
    return (value: number) => `${(value * 100).toFixed(1)}%`;
  }, []);

  // Simulate real-time metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        accuracy: 0.85 + Math.random() * 0.1,
        precision: 0.82 + Math.random() * 0.1,
        recall: 0.78 + Math.random() * 0.12,
        f1Score: 0.80 + Math.random() * 0.11
      });
    };

    // Initial update
    updateMetrics();
    
    // Set interval for periodic updates
    const interval = setInterval(updateMetrics, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Group time series data by category - memoized to prevent recalculation on each render
  const timeSeriesByCategory = useMemo(() => {
    return timeSeriesData.reduce((acc, point) => {
      if (!point.category) return acc;
      if (!acc[point.category]) acc[point.category] = [];
      acc[point.category].push(point);
      return acc;
    }, {} as Record<string, typeof timeSeriesData>);
  }, [timeSeriesData]);

  return (
    <section id="data-dashboard" className="section-container py-20 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent1/5 rounded-full filter blur-[150px] animate-pulse-slow opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-accent2/5 to-accent3/5 rounded-full filter blur-[120px] animate-float opacity-30"></div>

      <AISectionHeading
        subtext="Visualizing machine learning model performance metrics and data patterns"
      >
        AI Performance Dashboard
      </AISectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Model metrics card */}
        <AICard className="col-span-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent3">
            Model Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="text-sm text-center">
              <div className="flex justify-between mb-2">
                <span>Accuracy</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {formatPercent(metrics.accuracy)}
                </motion.div>
              </div>
              <div className="flex justify-between mb-2">
                <span>Precision</span>
                {formatPercent(metrics.precision)}
              </div>
              <div className="flex justify-between mb-2">
                <span>Recall</span>
                {formatPercent(metrics.recall)}
              </div>
              <div className="flex justify-between mb-2">
                <span>F1 Score</span>
                {formatPercent(metrics.f1Score)}
              </div>
            </div>
          </div>
        </AICard>
        
        {/* Scatter plot & cluster visualization */}
        <div className="col-span-2 relative flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent3">
            Scatter Plot & Clusters
          </h3>
          <div className="relative w-full h-[350px]">
            <ClusterCenters clusterData={clusterData} />
            {/* Scatter plot points */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {scatterData.map((data, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${data.x}%`,
                    top: `${data.y}%`,
                    width: '5px',
                    height: '5px',
                    backgroundColor: data.color
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Time series data visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.keys(timeSeriesByCategory).map((category, index) => (
          <div key={index} className="col-span-1">
            <TimeSeriesCategory
              category={category}
              points={timeSeriesByCategory[category]}
              categoryIndex={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DataDashboardSection;

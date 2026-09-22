import React from 'react';
import styles from './ProvenanceTimeline.module.css';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface ProvenanceTimelineProps {
  events: TimelineEvent[];
}

export const ProvenanceTimeline: React.FC<ProvenanceTimelineProps> = ({ events }) => {
  return (
    <div className={styles.timelineContainer}>
      <h3 className={styles.sectionTitle}>Proveniência Histórica</h3>
      
      <div className={styles.timeline}>
        {events.map((event, idx) => (
          <div key={idx} className={styles.eventRow}>
            <div className={styles.yearColumn}>
              <span className={styles.year}>{event.year}</span>
              <div className={styles.timelineLine}>
                <div className={styles.dot} />
                {idx !== events.length - 1 && <div className={styles.line} />}
              </div>
            </div>
            <div className={styles.contentColumn}>
              <h4 className={styles.title}>{event.title}</h4>
              <p className={styles.description}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

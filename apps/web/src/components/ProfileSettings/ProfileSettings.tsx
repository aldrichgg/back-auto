import React from 'react';
import styles from './ProfileSettings.module.css';

interface SettingGroup {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
    description?: string;
    icon: React.ReactNode;
  }[];
}

interface ProfileSettingsProps {
  groups: SettingGroup[];
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ groups }) => {
  return (
    <div className={styles.container}>
      {groups.map(group => (
        <div key={group.id} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <div className={styles.list}>
            {group.items.map(item => (
              <button key={item.id} className={styles.settingItem}>
                <div className={styles.iconBox}>{item.icon}</div>
                <div className={styles.info}>
                  <div className={styles.label}>{item.label}</div>
                  {item.description && <div className={styles.description}>{item.description}</div>}
                </div>
                <div className={styles.chevron}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

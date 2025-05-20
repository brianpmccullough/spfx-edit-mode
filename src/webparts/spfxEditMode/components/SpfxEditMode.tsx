import * as React from 'react';
import styles from './SpfxEditMode.module.scss';
import type { ISpfxEditModeProps } from './ISpfxEditModeProps';

export default class SpfxEditMode extends React.Component<ISpfxEditModeProps> {
  public render(): React.ReactElement<ISpfxEditModeProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.spfxEditMode} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          This is a SPFx web part.
        </div>
      </section>
    );
  }
}

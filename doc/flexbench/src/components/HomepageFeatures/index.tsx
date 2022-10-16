import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Standalone Script',
    Svg: require('@site/static/img/terminal_app_img.svg').default,
    description: (
      <>
        Flexbench was initially build as a npm package to be used as a standalone script
        that can be easily installed and used to test your server.
      </>
    ),
  },
  {
    title: 'Desktop App',
    Svg: require('@site/static/img/desktop_app_img.svg').default,
    description: (
      <>
        To make your testing hassle free Flexbench is also available as a desktop-app.
        Which is a cross-platform app.
      </>
    ),
  },
  {
    title: 'Server App',
    Svg: require('@site/static/img/server_app_img.svg').default,
    description: (
      <>
        A server exposing REST apis that will test your simulate traffic load to your server.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

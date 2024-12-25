import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Minimal and Flexible',
    Svg: require('@site/static/img/minimal.svg').default,
    description: (
      <>
        The <code>ngx-page-object-model</code> library is a simple, lightweight, and non-intrusive utility designed to work with all modern versions of <strong>Angular</strong>.
      </>
    ),
  },
  {
    title: 'Elegant Component DOM Testing',
    Svg: require('@site/static/img/elegant.svg').default,
    description: (
      <>
        Promoting best code practices by separating test logic from DOM manipulation, leveraging the <strong>Page Object Model</strong> design pattern to create clean, and readable unit tests for Angular UI components.
      </>
    ),
  },
  {
    title: 'Versatile and Agnostic',
    Svg: require('@site/static/img/versatile.svg').default,
    description: (
      <>
        Compatible with <strong>Jasmine</strong>, <strong>Jest</strong>, <strong>Vitest</strong>, or any other testing framework. Runs nicely with tools like <strong>Spectator</strong> or completely <strong>standalone</strong>. This library is suitable for all kinds of Angular applications!
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
        <Heading as="h3">{title}</Heading>
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

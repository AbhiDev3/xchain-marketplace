import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Xchain from "../components/spline/Xchain";
import Spline from "@splinetool/react-spline";
/**
 * Landing page with a simple gradient background and a hero asset.
 */

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div className={styles.heroAssetFrame}>.
            <Image
              src="https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png"
              alt="picachu"
              height={100}
              width={400}
              quality={80}
            />
            <Image
              src="/house2.png"
              width={860}
              height={650}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  X-Chain Gaming NFT 
                </span>
                <Xchain />
                Marketplace
                <br />
                Earn with your NFT Characters.
              </h1>
              <p className={styles.heroSubtitle}>
                Powered by{" "}
                <Link
                  className={styles.link}
                  href="https://www.connext.network/"
                  target="_blank"
                >
                  Connext
                </Link>{" "}
                
              </p>

              <div className={styles.heroCtaContainer}>
                <Link className={styles.heroCta} href="/buy">
                  Get Started
                </Link>
                <Link
                  className={styles.secondaryCta}
                  href="https://github.com/legendarykamal"
                  target="_blank"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

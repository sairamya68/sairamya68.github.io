import { siteConfig } from "../data/siteConfig.js";

export default function WalkingScene() {
  const showVideo = siteConfig.enableWalkingVideo && siteConfig.walkingVideo;

  return (
    <div className="hero-figure" data-depth="0.55">
      <div className="hero-glow" aria-hidden="true" />
      {showVideo ? (
        <video
          className="figure-walk"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={siteConfig.enableWalkingPoster ? siteConfig.walkingPoster : undefined}
        >
          <source src={siteConfig.walkingVideo} type="video/mp4" />
        </video>
      ) : (
        <img className="figure-walk" src={siteConfig.heroImage || siteConfig.profileImage} alt="Vallamsetti Sairamya" />
      )}
    </div>
  );
}

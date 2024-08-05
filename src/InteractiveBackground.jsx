// Suggested code may be subject to a license. Learn more: ~LicenseLog:1830589319.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3398204453.
import React, { useState, useEffect } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // if
const InteractiveBackground = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsInteractive(true);
    }, 1000); // Delay for 1 second
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#000", // Customize background color
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: isInteractive,
              mode: "push", // Add particles on click
            },
            onHover: {
              enable: isInteractive,
              mode: "repulse", // Repel particles on hover
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4, // Number of particles to add on click
            },
            repulse: {
              distance: 100, // Repulsion distance
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff", // Particle color
          },
          links: {
            color: "#ffffff", // Link color
            distance: 150, // Link distance
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce", // How particles behave at edges
            },
            random: false,
            speed: 2, // Particle speed
            straight: false,
          
},
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Number of particles
          },
          opacity: {
            value: 0.5, // Particle opacity
          },
          shape: {
            type: "circle", // Particle shape
          },
          size: {
            value: { min: 1, max: 5 }, // Particle size range
          },
        },
        detectRetina: true,
      }}
    />
  );
};
export default InteractiveBackground;

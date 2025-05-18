import styles from './destination.module.css';
import Image from 'next/image';

const DestinationPage = () => {
  const destinations = [
    { id: 1, image: '/img/about-1.jpg', link: '/destinations/1' },
    { id: 2, image: '/img/about-2.jpg', link: '/destinations/2' },
    { id: 3, image: '/img/about-1.jpg', link: '/destinations/3' },
    { id: 4, image: '/img/about-1.jpg', link: '/destinations/4' },
    { id: 5, image: '/img/about-2.jpg', link: '/destinations/5' },
  ];

  const contentBlocks = [
    {
      id: 1,
      title: "CARTHAGE",
      text: "La ville de Carthage est aujourd’hui perçue, comme étant une commune côtière, où, à priori, coexistent urbanisation pavillonnaire et îlots archéologiques isolés. Cependant, la capitale éponyme de l’empire Carthaginois fut le siège de plusieurs civilisations qui ont marqué l’histoire de la Méditerranée. Dourb’IA, vous propose dans ce parcours de découvrir Carthage en re-visitant des sites qui représentent des points culminants de l’histoire de la ville.",
      image: "/img/circuit-1.png",
      reverse: false,
      buttonText: "Allons-y !",
    },
    {
      id: 2,
      title: "LA MARSA",
      text: "La ville de La Marsa est aujourd’hui perçue comme une commune côtière, au croisement entre passé royal et urbanisation moderne Sous les Hafsides, elle servait de lieu de villégiature aux princes, autour du palais d’el Abdillya, construit selon la légende pour apaiser la mélancolie de la princesse Fatma. À partir du XIXᵉ siècle, La Marsa devient une résidence princière, attirant autour d’elle membres de la cour et consuls européens.Dourb’IA vous propose dans ce parcours de découvrir La Marsa en revisitant les traces de son histoire royale et de ses premières transformations urbaines.",
      image: "/img/circuit-2.png",
      reverse: true,
      buttonText: "Allons-y !",
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nouveautés</h1>
      <div className={styles.gradientBar}></div>
      
      <div className={styles.carouselContainer}>
        <div className={styles.carouselContent}>
          {destinations.map((destination) => (
            <div key={destination.id} className={styles.carouselItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={destination.image}
                  alt={`Destination ${destination.id}`}
                  width={508.81}
                  height={413.17}
                  className={styles.image}
                />
              </div>
              <a href={destination.link} className={styles.link}>
                En savoir plus
              </a>
            </div>
          ))}
          {/* Duplicate items for seamless looping */}
          {destinations.map((destination) => (
            <div key={`copy-${destination.id}`} className={styles.carouselItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={destination.image}
                  alt={`Destination ${destination.id}`}
                  width={787.81}
                  height={465.17}
                  className={styles.image}
                />
              </div>
              <a href={destination.link} className={styles.link}>
                En savoir plus
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.gradientBar1}></div>
            {/* New content section */}
            <h2 className={styles.title}>Commençons L’expérience</h2>
      
      {contentBlocks.map((block) => (
        <div 
          key={block.id} 
          className={`${styles.contentBox} ${block.reverse ? styles.reverse : ''}`}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={block.image}
              alt={block.title}
              width={600}
              height={400}
              className={styles.contentImage}
            />
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.contentTitle}>{block.title}</h3>
            <p className={styles.contentText}>{block.text}</p>
            <button 
              className={styles.button}
            >
              {block.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationPage;
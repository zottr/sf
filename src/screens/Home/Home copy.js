import CollectionItemsPreview from '../../components/CollectionItemsPreview';
import CollectionLinksView from '../../components/CollectionLinksView';
import PWAInstallButton from '../../components/MainHeader/PWAInstallButton';
import StoreBanner from '../../components/StoreBanner';

function Home() {
  return (
    <>
      <CollectionLinksView />
      <StoreBanner />
      <CollectionItemsPreview />
    </>
  );
}
export default Home;

import Button from "./components/ui/Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        variant="primary"
        text="Add content"
        size="sm"
        onClick={() => {}}
        startIcon={<PlusIcon size="sm" />}
        endIcon={<ShareIcon size="sm" />}
      />
      <Button
        variant="primary"
        text="hi sir kessa ho "
        size="md"
        onClick={() => {}}
        startIcon={<PlusIcon size="md" />}
        endIcon={<ShareIcon size="md" />}
      />
      endIcon={<ShareIcon size="lg" />}
    </>
  );
}

export default App;

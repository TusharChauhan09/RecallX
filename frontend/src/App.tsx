import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import Button from "./components/ui/Button";
import { Card } from "./components/ui/Card";

function App() {
  return (
    <div className="p-4" >
      <div className=" flex justify-end items-center gap-4 mb-4 ">
        <Button
          variant="primary"
          text="Add content"
          size="sm"
          onClick={() => {}}
          startIcon={<PlusIcon size="sm" />}
        />
        <Button
          variant="primary"
          text="Share Content "
          size="sm"
          onClick={() => {}}
          endIcon={<ShareIcon size="sm" />}
        /> 
      </div>

      <div className=" flex gap-4 ">
      <Card link={"https://x.com/TusharChau09/status/1877047209570546061"} title={"First twitte"} type={"twitter"} />     
      <Card link={"https://www.youtube.com/watch?v=D--QAlTdoQU"} title={""} type={"youtube"} />     
      </div>
    </div>
  );
}

export default App;

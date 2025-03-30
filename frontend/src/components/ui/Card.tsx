import { TwitterTweetEmbed } from "react-twitter-embed";
import ShareIcon from "../../icons/ShareIcon";

type CardProps = {
  title: string;
  link: string;
  type: "twitter" | "youtube";
};

function extractTweetId(url: string) {
  return url.split("/status/")[1].split("?")[0]; // Handles URLs with query params
}

export const Card = (props: CardProps) => {
  return (
    <div className=" max-w-75 min-h-48 h-auto flex flex-col bg-white p-5 rounded-md shadow-md border border-slate-200 gap-3 ">
      <div className=" flex justify-between items-center ">
        <div className=" flex items-center gap-3 font-medium text-gray-700  ">
          <ShareIcon size="md" />
          Project Ideas
        </div>
        <div className=" flex gap-3 text-gray-500 ">
          <div>
            <a href={props.link} target="_blank">
              <ShareIcon size="md" />
            </a>
          </div>
          <div>
            <ShareIcon size="md" />
          </div>
        </div>
      </div>
      <div>
        <div className=" font-bold text-2xl text-gray-700 ">
          Future Projects
        </div>
      </div>
      <div className=" w-full h-auto ">
        {props.type === "youtube" && (
          <div className="w-full aspect-video">
            <iframe
              className="w-full"
              src={props.link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {props.type === "twitter" && (
          <TwitterTweetEmbed tweetId={extractTweetId(props.link) ?? ""} />
        )}
      </div>
    </div>
  );
};

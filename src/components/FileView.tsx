interface IProp {
  imgUrl: string;
}

const FileView = ({ imgUrl }: IProp) => {
  return (
    <div className="m-5">
      <img src={imgUrl} alt="file" />
    </div>
  );
};

export default FileView;

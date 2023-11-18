
interface PictureProps {
    src: string;
}
  
const Picture: React.FC<PictureProps> = ({ src }) => {
    return (
        <div className="m-auto w-64 h-64 overflow-hidden">
        <img src={src} className="w-full h-full object-cover" />
        </div>
    );
};
  
export default Picture;
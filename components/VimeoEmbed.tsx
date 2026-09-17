export default function VimeoEmbed({ id, hash, title }: { id: string; hash?: string; title: string }) {
  const src = hash
    ? `https://player.vimeo.com/video/${id}?h=${hash}&title=0&byline=0&portrait=0`
    : `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;

  return (
    <div className="relative aspect-video overflow-hidden bg-black/40">
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

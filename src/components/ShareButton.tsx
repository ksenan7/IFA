import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { type FaSign } from "../utils/faEngine";
import { type Language } from "../utils/translations";

interface ShareButtonProps {
  sign: FaSign;
  lang: Language;
  variant?: "icon" | "pill";
  size?: "sm" | "md";
  className?: string;
}

/**
 * Build the WhatsApp share text for a given sign.
 * Produces a rich, formatted message in both French and Fon.
 */
function buildShareText(sign: FaSign, lang: Language): string {
  const header = `🌟 *${sign.nameFon}* 🌟`;
  const yoruba = `Yoruba : _${sign.nameYoruba}_`;
  const french = `Français : _${sign.nameFrench}_`;
  const divider = `━━━━━━━━━━━━━━━━`;

  const vodounSection =
    lang === "fr"
      ? `🔱 *Vodoun associé :* ${sign.vodounName}\n_${sign.vodounDescFr}_`
      : `🔱 *Vodoun :* ${sign.vodounName}\n_${sign.vodounDescFon}_`;

  const meaningSection =
    lang === "fr"
      ? `✨ *Signification :*\n${sign.meaningFr}`
      : `✨ *Tinmɛ :*\n${sign.meaningFon}`;

  const proverbs =
    lang === "fr"
      ? sign.proverbsFr.slice(0, 1).map((p) => `💬 _"${p}"_`).join("\n")
      : sign.proverbsFon.slice(0, 1).map((p) => `💬 _"${p}"_`).join("\n");

  const footer = `\n📱 _Partagé depuis Fa Duno — Application d'apprentissage du Ifá_`;

  return [header, yoruba, french, divider, vodounSection, divider, meaningSection, proverbs, footer]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * ShareButton — generates a WhatsApp share link for a Fa sign card.
 * On click, opens a new tab with the pre-filled WhatsApp message.
 */
export const ShareButton: React.FC<ShareButtonProps> = ({
  sign,
  lang,
  variant = "pill",
  size = "md",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();

    const text = buildShareText(sign, lang);
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;

    // Try to use native Web Share API if available (mobile browsers)
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      navigator
        .share({
          title: `Fa Duno — ${sign.nameFon}`,
          text: buildShareText(sign, lang),
        })
        .catch(() => {
          // Fallback to WhatsApp URL
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        });
    } else {
      // Desktop: open WhatsApp Web / WhatsApp Desktop
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    // Brief visual feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  if (variant === "icon") {
    return (
      <button
        onClick={handleShare}
        title={`Partager ${sign.nameFon} sur WhatsApp`}
        className={`p-2 rounded-full border transition-all duration-200 active:scale-90 ${
          copied
            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
            : "bg-stone-900 border-stone-800 text-stone-400 hover:border-green-700 hover:text-green-400"
        } ${className}`}
      >
        {copied ? <Check className={iconSize} /> : <Share2 className={iconSize} />}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      title={`Partager ${sign.nameFon} sur WhatsApp`}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 active:scale-95 ${
        copied
          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
          : "bg-stone-900 border-stone-700 text-stone-300 hover:border-green-700 hover:text-green-300"
      } ${className}`}
    >
      {copied ? (
        <Check className={iconSize} />
      ) : (
        /* WhatsApp logo SVG inline */
        <svg
          className={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      )}
      {copied ? "Envoyé !" : "WhatsApp"}
    </button>
  );
};

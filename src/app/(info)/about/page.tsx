import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {getTranslations} from '@/lib/translations';
import { PageProps } from '@/lib/types';


export default async function AboutPage({searchParams}: PageProps) {
  const lang =
    (typeof searchParams?.lang === 'string' ? searchParams.lang : 'sr') || 'sr';
  const t = getTranslations(lang);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{t.footerAbout}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{t.aboutDialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="whitespace-pre-wrap">{t.aboutDialogContent}</div>
      </DialogContent>
    </Dialog>
  );
}

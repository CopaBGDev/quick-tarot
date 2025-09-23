
import { ALL_TRANSLATIONS, TranslationSet } from './translations';
import srPosts from '@/lib/content/blog/sr.json';
import enPosts from '@/lib/content/blog/en.json';
import dePosts from '@/lib/content/blog/de.json';
import frPosts from '@/lib/content/blog/fr.json';
import esPosts from '@/lib/content/blog/es.json';

// Definisanje tipova
interface InternalLinkSource {
  titleKey: string;
  slug: string;
}

interface InternalLink extends InternalLinkSource {
  title: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  internalLinks: InternalLink[];
}

interface BlogPostSource {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  internalLinks: InternalLinkSource[];
}

const allPosts: Record<string, BlogPostSource[]> = {
    sr: srPosts,
    en: enPosts,
    de: dePosts,
    fr: frPosts,
    es: esPosts,
};

// Mapa za prevođenje ključeva u naslove
function getLinkTitleMap(t: TranslationSet): Record<string, string> {
    return {
        'sta-je-tarot-i-kako-funkcionise': t.blogPostTitle_sta_je_tarot_i_kako_funkcionise,
        'kako-postaviti-pravo-pitanje': t.blogPostTitle_kako_postaviti_pravo_pitanje,
        'tarot-vs-astrologija': t.blogPostTitle_tarot_vs_astrologija,
        'etika-u-tarotu': t.blogPostTitle_etika_u_tarotu,
        'velika-arkana-znacenja': t.blogPostTitle_velika_arkana_znacenja,
        'tarot-i-ljubav': t.blogPostTitle_TarotAndLove,
        'top-10-tarot-otvaranja': t.blogPostTitle_top_10_tarot_otvaranja,
        'najcesce-greske-pocetnika': t.blogPostTitle_najcesce_greske_pocetnika,
        'pregled-svih-78-karata': t.blogPostTitle_pregled_svih_78_karata,
        'mala-arkana-stapovi': t.blogPostTitle_mala_arkana_stapovi,
        'mala-arkana-pehari': t.blogPostTitle_mala_arkana_pehari,
        'mala-arkana-macevi': t.blogPostTitle_mala_arkana_macevi,
        'mala-arkana-pentakli': t.blogPostTitle_mala_arkana_pentakli,
        'kako-izabrati-pravo-otvaranje': t.blogPostTitle_kako_izabrati_pravo_otvaranje,
        'tarot-otvaranja-ljubav-odnosi': t.blogPostTitle_tarot_otvaranja_ljubav_odnosi,
        'tarot-otvaranja-posao-finansije': t.blogPostTitle_tarot_otvaranja_posao_finansije,
        'jednostavna-dnevna-otvaranja': t.blogPostTitle_jednostavna_dnevna_otvaranja,
        'tarot-i-karijera': t.blogPostTitle_tarot_i_karijera,
        'tarot-i-licni-razvoj': t.blogPostTitle_tarot_i_licni_razvoj,
        'ocistiti-energetizovati-tarot': t.blogPostTitle_ocistiti_energetizovati_tarot,
    };
}


// Funkcija za rešavanje internih linkova sa prevodom
function resolveInternalLinks(post: BlogPostSource, lang: string): BlogPost {
    const t = ALL_TRANSLATIONS[lang] || ALL_TRANSLATIONS.sr;
    const linkTitleMap = getLinkTitleMap(t);

    const resolvedInternalLinks: InternalLink[] = post.internalLinks.map(link => ({
        ...link,
        title: linkTitleMap[link.slug] || link.slug // Fallback na slug ako naslov nije pronađen
    }));

    return {
        ...post,
        title: post.metaTitle,
        internalLinks: resolvedInternalLinks
    };
}


export function getBlogPosts(lang: string): BlogPost[] {
    const baseLang = lang.split('-')[0];
    const postsForLang = allPosts[baseLang] || allPosts.sr;
    return postsForLang.map(post => resolveInternalLinks(post, baseLang));
}

export function getBlogPost(lang: string, slug: string): BlogPost | undefined {
    const baseLang = lang.split('-')[0];
    const postsForLang = allPosts[baseLang] || allPosts.sr;
    const post = postsForLang.find(p => p.slug === slug);
    
    if (!post) {
        return undefined;
    }

    return resolveInternalLinks(post, baseLang);
}

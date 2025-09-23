
import { ALL_TRANSLATIONS } from './translations';
import srPosts from '@/lib/content/blog/sr.json';
import enPosts from '@/lib/content/blog/en.json';
import dePosts from '@/lib/content/blog/de.json';
import frPosts from '@/lib/content/blog/fr.json';
import esPosts from '@/lib/content/blog/es.json';

export interface BlogPost {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  internalLinks: { titleKey: string; slug: string }[];
}

const allPosts: Record<string, BlogPost[]> = {
    sr: srPosts,
    en: enPosts,
    de: dePosts,
    fr: frPosts,
    es: esPosts,
};

// Function to resolve internal link titles based on the current language
function resolveInternalLinks(posts: BlogPost[], lang: string): BlogPost[] {
    const t = ALL_TRANSLATIONS[lang] || ALL_TRANSLATIONS.sr;

    const linkTitleMap: Record<string, string> = {
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
    };

    return posts.map(post => ({
        ...post,
        title: post.metaTitle, // Ensuring title property is populated from metaTitle
        internalLinks: post.internalLinks.map(link => ({
            ...link,
            title: linkTitleMap[link.slug] || link.slug // Fallback to slug if title not found
        }))
    }));
}


export function getBlogPosts(lang: string): BlogPost[] {
    const baseLang = lang.split('-')[0];
    const postsForLang = allPosts[baseLang] || allPosts.sr;
    return resolveInternalLinks(postsForLang, baseLang);
}

export function getBlogPost(lang: string, slug: string): BlogPost | undefined {
    const posts = getBlogPosts(lang);
    return posts.find(p => p.slug === slug);
}

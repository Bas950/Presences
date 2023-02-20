import { presence } from "../presence";

async function fetchStrings() {
	return presence.getStrings(
		{
			/**
			 * Reading all about 9GAG
			 */
			about: "9gag.about",
			/**
			 * Viewing collection:
			 */
			collection: "9gag.collection",
			/**
			 * Viewing what's fresh
			 */
			fresh: "9gag.fresh",
			/**
			 * Viewing gag:
			 */
			gag: "9gag.gag",
			/**
			 * Viewing what's hot
			 */
			hot: "9gag.hot",
			/**
			 * Viewing store page
			 */
			store: "9gag.store",
			/**
			 * Viewing tag:
			 */
			tag: "9gag.tag",
			/**
			 * Viewing what's trending
			 */
			trending: "9gag.trending",
			/**
			 * Browsing...
			 */
			browsing: "general.browsing",
			/**
			 * Viewing home page
			 */
			home: "general.viewHome",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof fetchStrings>>,
	oldLang: string = null;

export default async function getStrings(): ReturnType<typeof fetchStrings> {
	const newLang = await presence.getSetting<string>("lang").catch(() => "en");

	if (oldLang !== newLang || !strings) strings = await fetchStrings();
	strings ??= await fetchStrings();

	oldLang = newLang;

	return strings;
}

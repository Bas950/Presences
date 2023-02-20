import { presence } from "../presence";
import getStrings from "../util/getStrings";

/**
 * Gets the presence data for the main page of 9GAG (9gag.com)
 * @returns The presence data with the details set
 */
export async function getMainDetails(): Promise<PresenceData> {
	const path = document.location.pathname.split("/").filter(Boolean),
		[privacy, buttons, cover, strings] = await Promise.all([
			presence.getSetting<boolean>("privacy").catch(() => false),
			presence.getSetting<boolean>("buttons").catch(() => true),
			presence.getSetting<boolean>("cover").catch(() => true),
			getStrings(),
		]);

	if (privacy) {
		return {
			details: strings.browsing,
		};
	}

	if (!path.length || path[0] === "home") {
		return {
			details: strings.home,
		};
	}

	switch (path[0]) {
		case "trending":
			return {
				details: strings.trending,
			};
		case "hot":
			return {
				details: strings.hot,
			};
		case "fresh":
			return {
				details: strings.fresh,
			};
		case "gag": {
			return {
				details: strings.gag,
				state: document.querySelector(
					"#individual-post > article > header > h1"
				).textContent,
				largeImageKey: cover
					? document.querySelector<HTMLLinkElement>("link[rel='image_src']")
							.href
					: // eslint-disable-next-line no-undefined
					  undefined,
			};
		}
		case "tag": {
			return {
				details: strings.tag,
				state: document.querySelector(
					"#individual-post > article > header > h1"
				).textContent,
				largeImageKey: document.querySelector<HTMLLinkElement>(
					"link[rel='image_src']"
				).href,
			};
		}
	}

	return {};
}

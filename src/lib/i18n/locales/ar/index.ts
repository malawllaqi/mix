import common from "./common.json" with { type: "json" };
import layout from "./layout.json" with { type: "json" };

export default {
	layout,
	common,
} as const;

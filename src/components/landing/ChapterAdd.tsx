"use client";

import ScrollChapter from "./ScrollChapter";
import SearchDemo from "./SearchDemo";

/* Chapter 1, new stock: a card goes from the box to the store */
export default function ChapterAdd() {
  return (
    <ScrollChapter
      id="new-stock"
      ns="add"
      sheet
      steps={["open", "tap", "sale"]}
      dwell={[1.2, 1.4, 1.0]}
      mock={(progress) => <SearchDemo progress={progress} />}
    />
  );
}

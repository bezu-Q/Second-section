Exercises
Complete these in your Day 14 folder and push them to GitHub. Each one drills a different part of
today’s lesson.
1. Build a navbar with Flexbox: a logo on the left and three links plus a button on the right,
vertically centered, using justify-content: space-between.
2. Create a row of four cards with flex: 1 so they share the width equally, then add flex-wrap and a
gap so they reflow on a narrow screen.
3. Build a photo gallery with Grid using repeat(auto-fit, minmax(200px, 1fr)). Resize the window
and confirm the column count changes on its own.
4. Lay out a full page with grid-template-areas: header, sidebar, main and footer. Add a media
query that collapses it to a single column under 700px.
5. Take a product card and pin a circular "ETB Sale" badge to its top-right corner using relative +
absolute positioning.
Mini-Project — Rebuild a Real Layout
Ships with this reading
This mini-project is part of today’s assignment. You recreate a real interface’s layout from a
screenshot, and it is due before the next session.
What you will build
Pick a real Ethiopian web interface with a clear structure — an Ethio Telecom-style account
dashboard, a CBE online-banking screen, or an Ethiopian Airlines booking results page — and
rebuild its layout (structure only, placeholder content is fine) using Grid for the skeleton and Flexbox
for the components.
Requirements
• A Grid page skeleton built with grid-template-areas: at least a header, a sidebar or filter panel, a
main content area, and a footer.
• Flexbox for the components inside those areas — a navbar, a toolbar, or a row of stat cards.
• A responsive card grid somewhere, using repeat(auto-fit, minmax(...)).
• One sticky element — a header or sidebar that stays visible while the main area scrolls.
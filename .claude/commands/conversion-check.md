Run a quick conversion-focused scan on all HTML files in the project. Check each of these and report pass/fail with specifics:

**CTAs**
- [ ] Every persuasive section (screenshots, testimonials, rank progression, etc.) is followed by a CTA
- [ ] All CTA copy is consistent across the page
- [ ] All App Store / download links include UTM parameters
- [ ] "Cancel anytime" or similar trust micro-copy appears near primary CTAs
- [ ] Platform availability (iOS/Android) is mentioned near CTAs

**Links**
- [ ] No broken internal links (href values point to files that exist)
- [ ] All external links have target="_blank" and rel="noopener"

**Social Proof**
- [ ] Testimonials have names (not anonymous)
- [ ] Star ratings or review counts are visible
- [ ] User count or download count is displayed

**Email Capture**
- [ ] At least one email capture form exists
- [ ] Form action points to a real endpoint (not placeholder)
- [ ] Success state is handled

**Accessibility Quick Check**
- [ ] All images have meaningful alt text (not just "image" or single words)
- [ ] --text3 color passes WCAG AA against the background
- [ ] Skip-nav link exists
- [ ] <main> landmark exists

Report as a checklist. For any failing item, include the specific file and line context.

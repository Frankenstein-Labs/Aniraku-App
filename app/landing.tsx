import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppIcon } from "@/components/app-icon";
import { nothing } from "@/components/nothing-ui";

const HERO_ART = "https://s4.anilist.co/file/anilistcdn/media/anime/banner/182205-fRUoKv6f2JAq.jpg";
const FEATURE_ART = "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg";

function ActionButton({ label, onPress, variant = "primary", icon }: { label: string; onPress: () => void; variant?: "primary" | "quiet"; icon?: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, variant === "quiet" && styles.actionButtonQuiet, pressed && styles.pressed]}
    >
      {icon ? <AppIcon name={icon} size={16} color={variant === "primary" ? nothing.black : nothing.white} /> : null}
      <Text style={[styles.actionButtonText, variant === "quiet" && styles.actionButtonTextQuiet]}>{label}</Text>
    </Pressable>
  );
}

function Feature({ number, eyebrow, title, body, icon }: { number: string; eyebrow: string; title: string; body: string; icon: string }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureTop}>
        <Text style={styles.featureNumber}>{number}</Text>
        <AppIcon name={icon} size={22} color={nothing.red} />
      </View>
      <Text style={styles.featureEyebrow}>{eyebrow}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureBody}>{body}</Text>
    </View>
  );
}

export default function LandingScreen() {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.shell}>
          <View style={styles.navbar}>
            <Pressable accessibilityRole="button" accessibilityLabel="Open Aniraku home" onPress={() => router.push("/" as never)} style={({ pressed }) => [styles.wordmark, pressed && styles.pressed]}>
              <View style={styles.wordmarkMark}><Text style={styles.wordmarkMarkText}>A</Text></View>
              <View>
                <Text style={styles.wordmarkName}>ANIRAKU</Text>
                <Text style={styles.wordmarkCaption}>ANIME / NOTHING</Text>
              </View>
            </Pressable>
            <View style={styles.navLinks}>
              <Pressable accessibilityRole="link" onPress={() => router.push("/catalog" as never)}><Text style={styles.navLink}>DISCOVER</Text></Pressable>
              <Pressable accessibilityRole="link" onPress={() => router.push("/schedule" as never)}><Text style={styles.navLink}>SCHEDULE</Text></Pressable>
              <Pressable accessibilityRole="link" onPress={() => router.push("/random" as never)}><Text style={styles.navLink}>RANDOM</Text></Pressable>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Start watching" onPress={() => router.push("/catalog" as never)} style={({ pressed }) => [styles.navCta, pressed && styles.pressed]}>
              <Text style={styles.navCtaText}>START WATCHING</Text>
              <AppIcon name="arrow-top-right" size={14} color={nothing.black} />
            </Pressable>
          </View>

          <View style={styles.hero}>
            <View style={styles.heroCopy}>
              <View style={styles.signalRow}><View style={styles.signalDot} /><Text style={styles.signalText}>THE NOTHING ANIME EXPERIENCE</Text></View>
              <Text style={styles.heroTitle}>Find your next{`\n`}<Text style={styles.heroTitleAccent}>favorite story.</Text></Text>
              <Text style={styles.heroBody}>Aniraku brings discovery, real-time releases, and a focused player together in one quiet place. No noise. Just anime you want to watch.</Text>
              <View style={styles.heroActions}>
                <ActionButton label="Explore the catalog" onPress={() => router.push("/catalog" as never)} icon="magnify" />
                <ActionButton label="Pick something random" onPress={() => router.push("/random" as never)} variant="quiet" icon="dice" />
              </View>
              <View style={styles.heroMeta}><Text style={styles.heroMetaValue}>HD</Text><Text style={styles.heroMetaLabel}>MULTI-SERVER PLAYBACK</Text><View style={styles.metaRule} /><Text style={styles.heroMetaValue}>01</Text><Text style={styles.heroMetaLabel}>FOCUSED BY DESIGN</Text></View>
            </View>
            <View style={styles.heroVisual}>
              <View style={styles.heroVisualFrame}>
                <Image source={{ uri: HERO_ART }} style={styles.heroImage} contentFit="cover" transition={200} />
                <View style={styles.heroImageShade} />
                <View style={styles.heroVisualLabel}><Text style={styles.heroVisualLabelTop}>NOW PLAYING</Text><Text style={styles.heroVisualLabelTitle}>Stories worth staying up for.</Text><Text style={styles.heroVisualLabelMeta}>ANIRAKU / 2026</Text></View>
                <View style={styles.heroPlay}><AppIcon name="play" size={22} color={nothing.black} /></View>
              </View>
              <View style={styles.heroIndex}><Text style={styles.heroIndexCurrent}>01</Text><Text style={styles.heroIndexSlash}>/</Text><Text style={styles.heroIndexTotal}>04</Text><View style={styles.heroIndexLine}><View style={styles.heroIndexFill} /></View></View>
            </View>
          </View>

          <View style={styles.statement}><Text style={styles.statementKicker}>ANIRAKU, IN SHORT</Text><Text style={styles.statementText}>A cleaner way to discover, watch, and keep your place.</Text><Text style={styles.statementBody}>Built around the Android experience you already know, now made natural for your browser.</Text></View>

          <View style={styles.featureGrid}>
            <Feature number="01" eyebrow="DISCOVERY" title="A catalog that gets out of the way." body="Browse real AniList data through editorial rails, genre filters, schedules, and a search surface that stays focused." icon="magnify" />
            <Feature number="02" eyebrow="PLAYBACK" title="Your player, your rhythm." body="Move between episodes, servers, subtitles, quality and playback controls without leaving the story." icon="play" />
            <Feature number="03" eyebrow="CONTINUITY" title="Pick up exactly where you left off." body="History, progress, library, ratings and recommendations stay close when you sign in." icon="bookmark" />
          </View>

          <View style={styles.splitSection}>
            <View style={styles.splitImageWrap}><Image source={{ uri: FEATURE_ART }} style={styles.splitImage} contentFit="cover" transition={200} /><View style={styles.splitImageOverlay} /><View style={styles.splitImageTag}><Text style={styles.splitImageTagText}>01 / 25</Text></View></View>
            <View style={styles.splitCopy}><Text style={styles.sectionEyebrow}>MADE FOR THE MOMENT</Text><Text style={styles.splitTitle}>Less interface.{`\n`}More immersion.</Text><Text style={styles.splitBody}>Aniraku keeps the signal clear: artwork first, useful actions close by, and an interface that never competes with the episode.</Text><ActionButton label="Open the app" onPress={() => router.push("/" as never)} icon="arrow-top-right" /></View>
          </View>

          <View style={styles.finalCta}><View><Text style={styles.finalEyebrow}>READY WHEN YOU ARE</Text><Text style={styles.finalTitle}>Start with a story.</Text></View><ActionButton label="Enter Aniraku" onPress={() => router.push("/catalog" as never)} icon="arrow-top-right" /></View>

          <View style={styles.footer}><Text style={styles.footerBrand}>ANIRAKU</Text><Text style={styles.footerCopy}>Anime, without the noise.</Text><Text style={styles.footerMeta}>NOTHING UI / WEB PREVIEW</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: nothing.black },
  scrollContent: { paddingBottom: 48 },
  shell: { width: "100%", maxWidth: 1180, alignSelf: "center", paddingHorizontal: 28 },
  navbar: { minHeight: 84, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 18, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: nothing.line },
  wordmark: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 48 },
  wordmarkMark: { width: 30, height: 30, alignItems: "center", justifyContent: "center", backgroundColor: nothing.white, borderRadius: 6 },
  wordmarkMarkText: { color: nothing.black, fontSize: 18, fontWeight: "900" },
  wordmarkName: { color: nothing.white, fontSize: 13, fontWeight: "900", letterSpacing: 1.2 },
  wordmarkCaption: { color: nothing.dim, fontFamily: "monospace", fontSize: 8, fontWeight: "700", letterSpacing: 1.1, marginTop: 3 },
  navLinks: { flexDirection: "row", alignItems: "center", gap: 24, marginLeft: "auto" },
  navLink: { color: nothing.muted, fontFamily: "monospace", fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  navCta: { minHeight: 42, flexDirection: "row", alignItems: "center", gap: 9, paddingHorizontal: 14, backgroundColor: nothing.red, borderRadius: 6 },
  navCtaText: { color: nothing.black, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 0.7 },
  hero: { flexDirection: "row", flexWrap: "wrap", gap: 28, paddingTop: 86, paddingBottom: 88 },
  heroCopy: { flex: 1, minWidth: 300, justifyContent: "center", paddingVertical: 20 },
  signalRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 24 },
  signalDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: nothing.red },
  signalText: { color: nothing.red, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  heroTitle: { color: nothing.white, fontSize: 58, lineHeight: 62, fontWeight: "900", letterSpacing: -2.2 },
  heroTitleAccent: { color: nothing.red },
  heroBody: { maxWidth: 470, color: nothing.muted, fontSize: 16, lineHeight: 25, marginTop: 24 },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 30 },
  actionButton: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, paddingHorizontal: 17, backgroundColor: nothing.white, borderRadius: 7 },
  actionButtonQuiet: { backgroundColor: "transparent", borderWidth: 1, borderColor: nothing.line },
  actionButtonText: { color: nothing.black, fontSize: 12, fontWeight: "900" },
  actionButtonTextQuiet: { color: nothing.white },
  heroMeta: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 42 },
  heroMetaValue: { color: nothing.white, fontFamily: "monospace", fontSize: 11, fontWeight: "900" },
  heroMetaLabel: { color: nothing.dim, fontFamily: "monospace", fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },
  metaRule: { width: 18, height: 1, backgroundColor: nothing.line, marginHorizontal: 5 },
  heroVisual: { flex: 1, minWidth: 300, maxWidth: 560, alignSelf: "center" },
  heroVisualFrame: { minHeight: 390, overflow: "hidden", position: "relative", backgroundColor: nothing.raised, borderRadius: 10, borderWidth: 1, borderColor: nothing.line },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(9,9,9,0.52)" },
  heroVisualLabel: { position: "absolute", left: 24, right: 24, bottom: 24 },
  heroVisualLabelTop: { color: nothing.red, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  heroVisualLabelTitle: { color: nothing.white, fontSize: 24, fontWeight: "900", lineHeight: 29, marginTop: 8, maxWidth: 240 },
  heroVisualLabelMeta: { color: nothing.muted, fontFamily: "monospace", fontSize: 9, fontWeight: "800", marginTop: 12, letterSpacing: 0.8 },
  heroPlay: { position: "absolute", top: "50%", left: "50%", width: 60, height: 60, marginLeft: -30, marginTop: -30, alignItems: "center", justifyContent: "center", borderRadius: 30, backgroundColor: nothing.red },
  heroIndex: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  heroIndexCurrent: { color: nothing.red, fontFamily: "monospace", fontSize: 12, fontWeight: "900" },
  heroIndexSlash: { color: nothing.dim, fontFamily: "monospace", fontSize: 11 },
  heroIndexTotal: { color: nothing.muted, fontFamily: "monospace", fontSize: 11, fontWeight: "800" },
  heroIndexLine: { flex: 1, height: 1, marginLeft: 10, backgroundColor: nothing.line },
  heroIndexFill: { width: "25%", height: 1, backgroundColor: nothing.red },
  statement: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: nothing.line, paddingVertical: 46, paddingRight: 20 },
  statementKicker: { color: nothing.red, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  statementText: { maxWidth: 700, color: nothing.white, fontSize: 32, lineHeight: 38, fontWeight: "900", marginTop: 14 },
  statementBody: { maxWidth: 520, color: nothing.muted, fontSize: 14, lineHeight: 22, marginTop: 16 },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", gap: 1, marginTop: 1, backgroundColor: nothing.line },
  feature: { flex: 1, minWidth: 260, minHeight: 250, padding: 25, backgroundColor: nothing.black },
  featureTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  featureNumber: { color: nothing.dim, fontFamily: "monospace", fontSize: 10, fontWeight: "900" },
  featureEyebrow: { color: nothing.red, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.1, marginTop: 45 },
  featureTitle: { color: nothing.white, fontSize: 21, lineHeight: 26, fontWeight: "900", marginTop: 10 },
  featureBody: { color: nothing.muted, fontSize: 13, lineHeight: 20, marginTop: 14 },
  splitSection: { flexDirection: "row", flexWrap: "wrap", gap: 42, alignItems: "center", paddingVertical: 96 },
  splitImageWrap: { flex: 1, minWidth: 300, minHeight: 350, overflow: "hidden", position: "relative", backgroundColor: nothing.raised, borderRadius: 8 },
  splitImage: { ...StyleSheet.absoluteFillObject },
  splitImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(9,9,9,0.38)" },
  splitImageTag: { position: "absolute", top: 18, left: 18, paddingHorizontal: 9, paddingVertical: 7, backgroundColor: nothing.black, borderWidth: 1, borderColor: nothing.line, borderRadius: 4 },
  splitImageTagText: { color: nothing.white, fontFamily: "monospace", fontSize: 9, fontWeight: "900" },
  splitCopy: { flex: 1, minWidth: 300, paddingVertical: 20 },
  sectionEyebrow: { color: nothing.red, fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  splitTitle: { color: nothing.white, fontSize: 42, lineHeight: 46, fontWeight: "900", letterSpacing: -1.2, marginTop: 14 },
  splitBody: { maxWidth: 420, color: nothing.muted, fontSize: 15, lineHeight: 24, marginTop: 18, marginBottom: 25 },
  finalCta: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, padding: 30, backgroundColor: nothing.red, borderRadius: 8 },
  finalEyebrow: { color: "rgba(9,9,9,0.65)", fontFamily: "monospace", fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  finalTitle: { color: nothing.black, fontSize: 30, fontWeight: "900", marginTop: 8 },
  footer: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 38 },
  footerBrand: { color: nothing.white, fontSize: 12, fontWeight: "900", letterSpacing: 1.2 },
  footerCopy: { color: nothing.muted, fontSize: 12 },
  footerMeta: { color: nothing.dim, fontFamily: "monospace", fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});

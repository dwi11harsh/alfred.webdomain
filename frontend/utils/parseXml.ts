interface BoltAction {
  type: "file" | "shell";
  filePath?: string;
  content: string;
}

interface BoltArtifact {
  id: string;
  title: string;
  actions: BoltAction[];
}

function extractAttribute(
  tag: string,
  attributeName: string
): string | undefined {
  const regex = new RegExp(`${attributeName}="([^"]*)"`, "i");
  const match = tag.match(regex);
  return match ? match[1] : undefined;
}

export function parseXml(xml: string): BoltArtifact | null {
  // Find artifact boundaries
  const artifactStart = xml.indexOf("<boltArtifact");
  const artifactEnd = xml.indexOf("</boltArtifact>", artifactStart);

  if (artifactStart === -1 || artifactEnd === -1) {
    return null;
  }

  // Extract artifact tag and attributes
  const artifactTagEnd = xml.indexOf(">", artifactStart);
  if (artifactTagEnd === -1) return null;

  const artifactTag = xml.substring(artifactStart, artifactTagEnd + 1);
  const id = extractAttribute(artifactTag, "id");
  const title = extractAttribute(artifactTag, "title");

  if (!id || !title) return null;

  // Process inner content
  const innerContentStart = artifactTagEnd + 1;
  const innerContent = xml.substring(innerContentStart, artifactEnd);

  const actions: BoltAction[] = [];
  let position = 0;

  // Parse all actions in the artifact
  while (position < innerContent.length) {
    const actionStart = innerContent.indexOf("<boltAction", position);
    if (actionStart === -1) break;

    const tagEnd = innerContent.indexOf(">", actionStart);
    if (tagEnd === -1) break;

    // Extract action attributes
    const actionTag = innerContent.substring(actionStart, tagEnd + 1);
    const type = extractAttribute(actionTag, "type") as BoltAction["type"];
    const filePath =
      type === "file" ? extractAttribute(actionTag, "filePath") : undefined;

    // Find action content boundaries
    const contentStart = tagEnd + 1;
    const contentEnd = innerContent.indexOf("</boltAction>", contentStart);
    if (contentEnd === -1) break;

    // Extract and clean content
    let content = innerContent.substring(contentStart, contentEnd).trim();
    if (type === "file") content += "\n";

    actions.push({ type, filePath, content });
    position = contentEnd + "</boltAction>".length;
  }

  return { id, title, actions };
}

// Usage example:
/*
  const xmlString = `... your example XML ...`;
  const artifact = parseBoltArtifact(xmlString);
  
  if (artifact) {
    console.log('Artifact ID:', artifact.id);
    console.log('Artifact Title:', artifact.title);
    
    artifact.actions.forEach(action => {
      console.log('Action Type:', action.type);
      if (action.filePath) console.log('File Path:', action.filePath);
      console.log('Content:', action.content.substring(0, 50) + '...');
    });
  }
  */

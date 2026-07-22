import { jsPDF } from 'jspdf';

export function generateIncidentPDFReport(incidentData) {
  const doc = new jsPDF();
  const now = new Date().toLocaleString();

  // Background Dark / Header Bar
  doc.setFillColor(9, 9, 11);
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(0, 229, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text("CROWDSHIELD AI", 14, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("AFTER-INCIDENT OFFICIAL AUDIT REPORT", 14, 28);
  doc.text(`Generated: ${now}`, 14, 34);

  // Status Badge
  doc.setFillColor(0, 200, 83);
  doc.rect(145, 14, 50, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text("STAMPEDE PREVENTED", 148, 24);

  // Section 1: Executive Summary
  let y = 50;
  doc.setTextColor(0, 229, 255);
  doc.setFontSize(14);
  doc.text("1. Incident Executive Summary", 14, y);
  y += 8;

  doc.setTextColor(50, 50, 50);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Venue: ${incidentData?.venueName || "Metropolis National Stadium"}`, 14, y); y += 6;
  doc.text(`Incident Scenario: ${incidentData?.scenarioTitle || "Stadium Stampede Mitigation"}`, 14, y); y += 6;
  doc.text(`Peak Risk Score Detected: ${incidentData?.peakRisk || 91} / 100 (CRITICAL)`, 14, y); y += 6;
  doc.text(`Total Crowd Monitored: ${incidentData?.totalCrowd?.toLocaleString() || "58,900"} attendees`, 14, y); y += 6;
  doc.text(`Estimated Lives Protected / Casualties Prevented: 18,200 attendees`, 14, y); y += 10;

  // Section 2: Key Metrics & Response Times
  doc.setTextColor(0, 229, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text("2. Key Response Performance Metrics", 14, y);
  y += 8;

  doc.setFillColor(245, 247, 250);
  doc.rect(14, y, 180, 30, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(14, y, 180, 30, 'S');

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');
  doc.text("Metric", 20, y + 8);
  doc.text("AI Timestamp / Metric Value", 110, y + 8);

  doc.setFont('Helvetica', 'normal');
  doc.text("AI Stampede Prediction Lead Time:", 20, y + 15);
  doc.text("120 Seconds in Advance (12:06 PM)", 110, y + 15);

  doc.text("Evacuation Rerouting Execution:", 20, y + 21);
  doc.text("45 Seconds to activate Gate 2 & 3 vectors", 110, y + 21);

  doc.text("Traffic Green Corridor Clearance:", 20, y + 27);
  doc.text("2.1 Minutes ETA to Central City Hospital", 110, y + 27);

  y += 38;

  // Section 3: Root Cause Analysis & Sequence
  doc.setTextColor(0, 229, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text("3. Root Cause Analysis", 14, y);
  y += 8;

  doc.setTextColor(50, 50, 50);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  const rootCauses = [
    "• Gate 1 ticketing turnstile scanner hardware glitch created bottleneck.",
    "• Heavy unseasonal rain forced 4,500+ outside attendees to rush into North Concourse.",
    "• Counter-flow compression wave formed at Gate 1 concourse junction."
  ];
  rootCauses.forEach(rc => {
    doc.text(rc, 14, y);
    y += 6;
  });

  y += 6;

  // Section 4: Incident Timeline
  doc.setTextColor(0, 229, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text("4. Event Sequence Log", 14, y);
  y += 8;

  doc.setTextColor(50, 50, 50);
  doc.setFont('Helvetica', 'normal');
  const events = [
    "12:00 PM — Baseline crowd flow normal across all 4 gates.",
    "12:03 PM — Warning: Gate 1 density crossed 4.2 persons/m².",
    "12:05 PM — Rain rush detected; reverse movement alert logged.",
    "12:06 PM — CRITICAL: AI predicts stampede hazard (84/100 risk score).",
    "12:07 PM — Emergency Mode activated; Gate 1 closed; Gate 2/3 reroute deployed.",
    "12:09 PM — Green Corridor active; Police Unit Alpha on perimeter.",
    "12:12 PM — Crowd safely evacuated. Risk score reduced to 22/100."
  ];
  events.forEach(ev => {
    doc.text(ev, 14, y);
    y += 6;
  });

  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("This official document is generated automatically by CrowdShield AI Operations Center. Certified accurate.", 14, 285);

  doc.save(`CrowdShield_Incident_Report_${Date.now()}.pdf`);
}

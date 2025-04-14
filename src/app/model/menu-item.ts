export class MenuItem {
  display: string;
  href: string;
  tooltip: string;
  // action?: () => void;

  constructor(
    display: string,
    href: string,
    tooltip: string
    // action?: () => void
  ) {
    // this.action = action;
    this.display = display;
    this.href = href;
    this.tooltip = tooltip;
  }
}

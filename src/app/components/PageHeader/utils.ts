export const getPadding = (
  justify: string,
  hasComponent: boolean,
  hasOppositeComponent: boolean,
  componentWidth?: number
) => {
  return justify === 'center' && hasComponent && !hasOppositeComponent
    ? `${(componentWidth ?? 0) + 24}px`
    : 0
}

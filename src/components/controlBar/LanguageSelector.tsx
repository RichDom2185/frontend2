import { LanguageConfig, LanguageGroup } from 'src/types/languages';
import { allLanguages } from 'src/utils/languages';
import { Button, Menu, MenuItem, Popover, Tooltip } from '@blueprintjs/core';
import { Variant } from 'js-slang/dist/types';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  disabled?: boolean;
  disableFilters?: [(l: LanguageConfig) => boolean, string][];
  group: LanguageGroup;
  minimal?: boolean;
  onSelect?: (lang: LanguageConfig) => void;
};

const buildMenu = (items: LanguageConfig[], renderItem: (l: LanguageConfig) => React.ReactNode) => {
  const defaultChoices = items.filter(({ variant }) => variant === Variant.DEFAULT);
  const variantChoices = items.filter(({ variant }) => variant !== Variant.DEFAULT);

  return (
    <Menu style={{ display: 'flex', flexDirection: 'column' }}>
      {defaultChoices.map(renderItem)}
      {variantChoices.length > 0 && (
        <MenuItem key="variant-menu" text="Variants" icon="cog">
          {variantChoices.map(renderItem)}
        </MenuItem>
      )}
    </Menu>
  );
};

const createMenuItemRenderer = (
  onClick: (lang: LanguageConfig) => void,
  disableFilters: [(l: LanguageConfig) => boolean, string][]
) => {
  const renderer = (lang: LanguageConfig) => {
    const disabledReason = disableFilters.find(([filter, _]) => filter(lang));
    const tooltipContent = disabledReason ? disabledReason[1] : undefined;
    const isDisabled = disabledReason !== undefined;
    return (
      <Tooltip
        key={lang.displayName}
        content={tooltipContent}
        disabled={tooltipContent === undefined}
      >
        <MenuItem onClick={() => onClick(lang)} text={lang.displayName} disabled={isDisabled} />
      </Tooltip>
    );
  };

  return renderer;
};

const LanguageSelector: React.FC<Props> = ({
  disabled,
  disableFilters = [],
  group,
  minimal,
  onSelect,
}) => {
  // TODO: Make this a controlled component
  const [selectedItem, setSelectedItem] = useState<LanguageConfig | undefined>(undefined);
  const options = useMemo(
    () => allLanguages.filter(({ group: languageGroup }) => languageGroup === group),
    [group]
  );

  const handleSelect = useCallback(
    (lang: LanguageConfig) => {
      setSelectedItem(lang);
      onSelect?.(lang);
    },
    [onSelect]
  );

  const renderer = useMemo(
    () => createMenuItemRenderer(handleSelect, disableFilters),
    [disableFilters, handleSelect]
  );

  if (minimal) {
    return (
      <Popover content={buildMenu(options, renderer)} placement="bottom">
        <Button
          minimal={disabled}
          ellipsizeText={!disabled}
          style={{ maxWidth: disabled ? undefined : 100 }}
          disabled={disabled}
        >
          {selectedItem?.displayName ?? 'Language'}
        </Button>
      </Popover>
    );
  }

  return (
    <Popover content={buildMenu(options, renderer)} placement="bottom">
      <Button
        minimal
        text={selectedItem?.displayName ?? 'Select language'}
        rightIcon={disabled ? null : 'double-caret-vertical'}
        disabled={disabled}
      />
    </Popover>
  );
};

export default LanguageSelector;

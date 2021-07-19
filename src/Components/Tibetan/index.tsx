import React, { useState, useEffect } from 'react';
import { TibetanText } from './styles';
import Tibetan, { parser } from '../../Utils/Tibetan';

const TibetanDisplay = ({
  source,
  preview,
  small,
  setValid,
}: {
  source: string;
  preview?: boolean;
  small?: boolean;
  setValid?: (valid: boolean) => void;
}) => {
  const [previewText, setPreviewText] = useState(null);

  useEffect(() => {
    if (preview) {
      let isValid = true;
      const words = source.split(' ').map(x => x.includes('-') ? x.split('-').map(y => new Tibetan(y)) : new Tibetan(x.trim()));
      const newWords = words
        .map(x => {
          if ('map' in x) {
            isValid = isValid && x.every(y => y.valid);
            return x.map(y => y.valid ? y : new Tibetan(y.source + 'a'));
          }
          isValid = isValid && x.valid;
          return x.valid ? x : new Tibetan(x.source + 'a');
        });
      if (setValid) setValid(isValid);
      setPreviewText(newWords.map(x => 'map' in x ? x.map(y => y.toString()).join('') : x.toString()).join(String.fromCharCode(0xf0b)));
    }
  }, [source, preview]);
  console.log(source)
  console.log(parser(source))
  return (
    <TibetanText small={small}>
      {previewText ?? parser(source)}
    </TibetanText>
  )
}

export default TibetanDisplay;

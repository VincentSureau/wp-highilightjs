/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { TextareaControl, SelectControl, Panel, PanelBody, PanelRow, Toolbar, ToolbarDropdownMenu } from '@wordpress/components';

import hljs from 'highlight.js';
import { useEffect } from 'react';
import languages from './languages';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({isSelected, attributes, setAttributes}) {
	const {content, contentLanguage} = attributes;
	useEffect(() => {
		document.querySelectorAll('.code-snippet_content').forEach((el) => {
			hljs.highlightElement(el);
		});
	},[content, isSelected]);

	const onChangeContent = event => {
		setAttributes({content: event.target.value})
		resize(event.target);
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<div id="code-snippet-controls">
					<Panel>
						<PanelBody title="Highlight.js" icon={ 'html' } initialOpen={ true }>
							<PanelRow>
								<SelectControl
									label={ __( 'Langage', 'code-snippet' ) }
									value={ contentLanguage }
									options={ languages }
									onChange={ ( newLanguage ) => setAttributes( {'contentLanguage': newLanguage} ) }
									__nextHasNoMarginBottom
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</div>
			</InspectorControls>
			<BlockControls>
				<Toolbar label="Options">
					<ToolbarDropdownMenu
						icon={ 'html' }
						label="Choisir un langage"
						controls={languages.map(language => {
							return {
								title: language.label,
								onClick: () => setAttributes( {contentLanguage: language.value})
							}
						})}
					/>
				</Toolbar>
			</BlockControls>
			{isSelected ?
				<TextareaControl
					label={ __( 'Extrait de code', 'code-snippet' ) }
					value={ content }
					onChange={onChangeContent}
					rows={10}
				/>
				:
				<pre>
					<code className={`code-snippet_content ${contentLanguage}`}>
						{content}
					</code>
				</pre>
			}
		</div>
	);
}

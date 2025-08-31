import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCarBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_car_blocks';
  info: {
    description: '';
    displayName: 'Car block';
  };
  attributes: {
    carImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    className: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    isBusiness: Schema.Attribute.Boolean;
    listCars: Schema.Attribute.String;
    price: Schema.Attribute.Integer;
    pricePerKm: Schema.Attribute.Integer;
  };
}

export interface SharedDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_default_seos';
  info: {
    displayName: 'defaultSeo';
  };
  attributes: {};
}

export interface SharedFaQs extends Struct.ComponentSchema {
  collectionName: 'components_shared_fa_qs';
  info: {
    displayName: 'FAQs';
    icon: 'question-circle';
  };
  attributes: {
    faqDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    faqTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqs extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'faqs';
  };
  attributes: {
    faqDescription: Schema.Attribute.Text;
    faqTitle: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_text_blocks';
  info: {
    displayName: 'Rich Text Block';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.car-block': SharedCarBlock;
      'shared.default-seo': SharedDefaultSeo;
      'shared.fa-qs': SharedFaQs;
      'shared.faqs': SharedFaqs;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.rich-text-block': SharedRichTextBlock;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}

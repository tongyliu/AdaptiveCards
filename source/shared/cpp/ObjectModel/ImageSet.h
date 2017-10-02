#pragma once

#include "pch.h"
#include "Enums.h"
#include "Image.h"
#include "BaseCardElement.h"

namespace AdaptiveCards
{
class BaseCardElement;
class ImageSet : public BaseCardElement
{
friend class ImageSetParser;
public:
    ImageSet();
    ImageSet(Spacing spacing, bool separation);
    ImageSet(Spacing spacing, bool separation, std::vector<std::shared_ptr<Image>>& images);

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    ImageSize GetImageSize() const;
    void SetImageSize(const ImageSize value);

    std::vector<std::shared_ptr<Image>>& GetImages();
    const std::vector<std::shared_ptr<Image>>& GetImages() const;

private:
    std::vector<std::shared_ptr<Image>> m_images;
    ImageSize m_imageSize;
};
    
class ImageSetParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}
#pragma once

#include "pch.h"
#include "BaseInputElement.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class DateInput : public BaseInputElement
{
public:
    DateInput();

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    std::string GetMax() const;
    void SetMax(const std::string value);

    std::string GetMin() const;
    void SetMin(const std::string value);

    std::string GetPlaceholder() const;
    void SetPlaceholder(const std::string value);

    std::string GetValue() const;
    void SetValue(const std::string value);

private:
    std::string m_max;
    std::string m_min;
    std::string m_placeholder;
    std::string m_value;
};

class DateInputParser : ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}
#pragma once

#include "pch.h"
#include "BaseInputElement.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class NumberInput : public BaseInputElement
{
public:
    NumberInput();

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    std::string GetPlaceholder() const;
    void SetPlaceholder(const std::string value);

    int GetValue() const;
    void SetValue(const int value);

    int GetMax() const;
    void SetMax(const int value);

    int GetMin() const;
    void SetMin(const int value);

private:
    std::string m_placeholder;
    int m_value;
    int m_max;
    int m_min;
};

class NumberInputParser : ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}
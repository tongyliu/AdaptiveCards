#pragma once

#include "pch.h"
#include "Enums.h"
#include "Fact.h"
#include "BaseCardElement.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class BaseCardElement;
class FactSet : public BaseCardElement
{
friend class FactSetParser;
public:
    FactSet();
    FactSet(Spacing spacing, bool separation);
    FactSet(Spacing spacing, bool separation, std::vector<std::shared_ptr<Fact>>& facts);

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    std::vector<std::shared_ptr<Fact>>& GetFacts();
    const std::vector<std::shared_ptr<Fact>>& GetFacts() const;

private:
    std::vector<std::shared_ptr<Fact>> m_facts; 
};

class FactSetParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}
#include "FactSet.h"
#include "ParseUtil.h"
#include "Fact.h"

using namespace AdaptiveCards;

FactSet::FactSet() : BaseCardElement(CardElementType::FactSet)
{
}

FactSet::FactSet(
    Spacing spacing,
    bool separation,
    std::vector<std::shared_ptr<Fact>>& facts) :
    BaseCardElement(CardElementType::FactSet, spacing, separation),
    m_facts(facts)
{
}

FactSet::FactSet(
    Spacing spacing,
    bool separation) :
    BaseCardElement(CardElementType::FactSet, spacing, separation)
{
}

const std::vector<std::shared_ptr<Fact>>& FactSet::GetFacts() const
{
    return m_facts;
}

std::vector<std::shared_ptr<Fact>>& FactSet::GetFacts()
{
    return m_facts;
}

std::string FactSet::Serialize()
{
    Json::FastWriter writer;
    return writer.write(SerializeToJsonValue());
}

Json::Value FactSet::SerializeToJsonValue()
{
    Json::Value root = BaseCardElement::SerializeToJsonValue();

    std::string factsPropertyName = AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Facts);
    root[factsPropertyName] = Json::Value(Json::arrayValue);
    for (const auto& fact : GetFacts())
    {
        root[factsPropertyName].append(fact->SerializeToJsonValue());
    }

    return root;
}

std::shared_ptr<BaseCardElement> FactSetParser::Deserialize(const Json::Value& value)
{
    ParseUtil::ExpectTypeString(value, CardElementType::FactSet);

    auto factSet = BaseCardElement::Deserialize<FactSet>(value);

    // Parse Facts
    auto facts = ParseUtil::GetElementCollectionOfSingleType<Fact>(value, AdaptiveCardSchemaKey::Facts, Fact::Deserialize, true);
    factSet->m_facts = std::move(facts);

    return factSet;
}

std::shared_ptr<BaseCardElement> FactSetParser::DeserializeFromString(const std::string& jsonString)
{
    return FactSetParser::Deserialize(ParseUtil::GetJsonValueFromString(jsonString));
}